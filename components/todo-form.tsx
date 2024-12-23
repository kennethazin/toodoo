"use client";
import { addTodo } from "@/app/todos/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { TodoOptimisticUpdate } from "./todo-list";
import { Todo } from "@/types/custom";
import { Input } from "@/components/ui/input";

function FormContent() {
  const { pending } = useFormStatus();
  return (
    <>
      <Input
        disabled={pending}
        minLength={4}
        name="todo"
        required
        placeholder="Add a new todo"
        className="border-none outline-none"
      />
      <Input  className="border-none outline-none" name="description" placeholder="Add a description" />
      <Button type="submit" size="icon" className="min-w-10" disabled={pending}>
        <Send className="h-3 w-3" />
        <span className="sr-only">Submit Todo</span>
      </Button>
    </>
  );
}

export function TodoForm({
  optimisticUpdate,
}: {
  optimisticUpdate: TodoOptimisticUpdate;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Card className="mb-20">
      <CardContent className="p-3">
        <form
          ref={formRef}
          className="flex gap-4"
          action={async (data) => {
            try {
              const task = data.get("todo") as string;
              const description = data.get("description") as string || "Default description";
              console.log("Form data:", { task, description });

              const newTodo: Todo = {
                id: -1,
                inserted_at: "",
                user_id: "",
                task,
                description,
                is_complete: false,
              };
              console.log("New todo:", newTodo);
              optimisticUpdate({ action: "create", todo: newTodo });
              await addTodo(data);
              formRef.current?.reset();
            } catch (error) {
              console.error("Error adding todo:", error);
            }
          }}
        >
          <FormContent />
        </form>
      </CardContent>
    </Card>
  );
}
