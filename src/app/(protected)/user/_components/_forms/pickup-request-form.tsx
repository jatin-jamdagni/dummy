"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateTimePicker } from "@/components/date-picker";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PickupFormValues, pickupSchema } from "@/schemas";
import { CustomPhoneInput } from "@/components/ui/phone-input";

export const PickupRequestForm = () => {
  const form = useForm<PickupFormValues>({
    resolver: zodResolver(pickupSchema),
    defaultValues: {
      date: new Date(),
      contactNo: "",
      contactPerson: "",
      address: "",
      itemCount: 1,
      remarks: "",
    },
  });

  function onSubmit(data: PickupFormValues) {
    console.log(data);
    // Here you would typically send the data to your backend
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Pickup Request Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Date</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        date={field.value}
                        onDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact person" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact No</FormLabel>
                    <FormControl>
                      <CustomPhoneInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="itemCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Items</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value
                            ? parseInt(e.target.value, 10)
                            : undefined;
                          field.onChange(value);
                        }}
                        onBlur={() => {
                          if (!field.value) {
                            field.onChange(1);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Remarks" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit Pickup Request
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
