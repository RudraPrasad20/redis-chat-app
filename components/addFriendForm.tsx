"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email().min(4, {
    message: "Invalid Mail",
  }),
});

export function AddFriend() {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(
        "/api/friends/add",
        { email: values.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowSuccessState(true);
    } catch (error) {
      console.error("Error adding friend:", error);
      // Handle error state or logging as needed
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Add friend by E-Mail</FormLabel>
              <FormControl>
                <Input placeholder="newfriend@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                {showSuccessState ? (
                  <p className="mt-1 text-sm text-green-600">
                    Friend request sent!
                  </p>
                ) : null}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
