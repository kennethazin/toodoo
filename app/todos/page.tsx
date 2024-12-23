
import { TodoList } from "@/components/todo-list";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function TodosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: todos, error } = await supabase
    .from("todos")
    .select()
    .order("inserted_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error.message);
    return <div>Error loading todos</div>;
  }

  return (
    <section>
      <TodoList todos={todos ?? []} />
    </section>
  );
}
