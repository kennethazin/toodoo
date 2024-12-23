"use server"

import { Todo } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();

export async function addTodo(formData: FormData) {
    const text = formData.get("todo") as string | null;
    const descriptionText = formData.get("description") as string | null;

    if (!text) {
        console.error("Error: Text is required");
        throw new Error("Text is required");
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error("Error fetching user:", userError.message);
        throw new Error("Error fetching user");
    }

    if (!user) {
        console.error("Error: User is not logged in");
        throw new Error("User is not logged in");
    }

    console.log("Adding todo:", { text, descriptionText, user_id: user.id });

    const { data, error } = await supabase.from("todos").insert({
        task: text,
        description: descriptionText,
        user_id: user.id
    }).select();

    if (error) {
        console.error("Error inserting todo:", error.message);
        throw new Error("Error inserting todo");
    }

    console.log("Inserted todo:", data);

    revalidatePath("/todos");
}

export async function deleteTodo(id: number) {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
        throw new Error("Error deleting task");
    }

    revalidatePath("/todos");
}

export async function updateTodo(todo: Todo) {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("User is not logged in")
    }

    const { error } = await supabase.from("todos").update(todo).match({
        user_id: user.id,
        id: todo.id
    })

    if (error) {
        throw new Error("Error updating task")
    }

    revalidatePath("/todos")
}