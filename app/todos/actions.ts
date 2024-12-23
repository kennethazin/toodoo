"use server"

import { Todo } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
    const supabase = createClient();
    const text = formData.get("todo") as string | null
    const descriptionText = formData.get("description") as string | null


    if (!text) {
<<<<<<< HEAD
        console.error("Error: Text is required");
        throw new Error("Text is required");
=======
        throw new Error("Text is required")
>>>>>>> parent of 7102f03 (fixes)
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
<<<<<<< HEAD
        console.error("Error: User is not logged in");
        throw new Error("User is not logged in");
=======
        throw new Error("User is not logged in")
>>>>>>> parent of 7102f03 (fixes)
    }

    console.log("Adding todo:", { text, descriptionText, user_id: user.id });

    const { data, error } = await supabase.from("todos").insert({
        task: text,
        description: descriptionText,
        user_id: user.id
<<<<<<< HEAD
    }).select();

    if (error) {
        console.error("Error inserting todo:", error.message);
        throw new Error("Error inserting todo");
    }

    console.log("Inserted todo:", data);
=======
    })

    if (error) {
        throw new Error("Error adding task")
    }
>>>>>>> parent of 7102f03 (fixes)

    revalidatePath("/todos")
}

export async function deleteTodo(id: number) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("User is not logged in")
    }

    const { error } = await supabase.from("todos").delete().match({
        user_id: user.id,
        id: id
    })

    if (error) {
        throw new Error("Error deleting task")
    }

    revalidatePath("/todos")
}

export async function updateTodo(todo: Todo) {


    const supabase = createClient();
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