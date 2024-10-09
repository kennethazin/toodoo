"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Note {
  id: number;
  title: string;
}

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("notes").select("*");
      if (error) {
        console.error("Error fetching notes", error);
      } else {
        setNotes(data || []);
      }
      setNotes(data || []);
    };
    getData();
  }, []);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title: newNote }]);
    if (error) {
      console.error("Error adding note:", error);
      return;
    }

    if (data) {
      setNotes((prevNotes) => [...prevNotes, ...data]);
      setNewNote("");
    }
  };

  const handleDeleteNote = async (id: number) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      console.error("Error deleting note:", error);
      return;
    }

    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <div>

        
        <form onSubmit={handleAddNote}>
            <div className="flex flex-col gap-5">
          <Input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new task"
          />
          <Button type="submit">Add task</Button>
          </div>
        </form>

<div className="mt-5">
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Button variant="destructive" onClick={() => handleDeleteNote(note.id)}>Delete</Button>{" "}
              {note.title}{" "}
            </li>
          ))}
        </ul>
        </div>

    </div>
  );
}
