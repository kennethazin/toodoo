"use client";
import { deleteTodo, updateTodo } from "@/app/todos/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/types/custom";
import { TrashIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { TodoOptimisticUpdate } from "./todo-list";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function TodoItem({
  todo,
  optimisticUpdate,
}: {
  todo: Todo;
  optimisticUpdate: TodoOptimisticUpdate;
}) {
  return (
    <form>
      <TodoCard optimisticUpdate={optimisticUpdate} todo={todo} />
    </form>
  );
}

export function TodoCard({
  todo,
  optimisticUpdate,
}: {
  todo: Todo;
  optimisticUpdate: TodoOptimisticUpdate;
}) {
  const { pending } = useFormStatus();
  const [checked, setChecked] = useState(todo.is_complete);
  return (
    <>
      <ContextMenu>
        <div className="flex  items-center ">
          <ContextMenuTrigger className="w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <div className="w-full ">
                <span className="size-5  mr-5">
                  <Checkbox
                    disabled={pending}
                    checked={Boolean(checked)}
                    onCheckedChange={async (val) => {
                      if (val === "indeterminate") return;
                      setChecked(val);
                      await updateTodo({ ...todo, is_complete: val });
                    }}
                  />
                </span>
                </div>
                <AccordionTrigger className="w-full">{todo.task}</AccordionTrigger>
                <AccordionContent className="">
                  {todo.description ? (
                    todo.description
                  ) : (
                    <span>
                      <Textarea
                        placeholder="Add a description"
                        className="border-none outline-none "
                      />
                    </span>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <ContextMenuContent className="w-64">
              <ContextMenuItem>
                <Button
                  onClick={async () => {
                    optimisticUpdate({ action: "delete", todo });
                    await deleteTodo(todo.id);
                  }}
                  variant="ghost"
                  size="context"
                >
                  <TrashIcon className="w-4 h-4 mr-2 stroke-muted-foreground" />{" "}
                  Delete
                </Button>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenuTrigger>
        </div>
      </ContextMenu>
    </>
  );
}
