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

  const { data: todos } = await supabase
    .from("todos")
    .select()
    .order("is_complete", { ascending: true })
    .order("inserted_at", { ascending: false });

  return (
    <section>

      <TodoList todos={todos ?? []} />
    </section>
  );
}
