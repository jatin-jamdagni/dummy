"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTimePicker } from "@/components/date-picker";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShredFormValues, shredSchema } from "@/schemas";
import { CustomPhoneInput } from "@/components/ui/phone-input";

export const ShredRequestForm = () => {
  const form = useForm<ShredFormValues>({
    resolver: zodResolver(shredSchema),
    defaultValues: {
      date: new Date(),
      contactPerson: "",
      contactNo: "",
      shredLocation: "OFF_SITE",
      itemCount: 1,
      itemType: "PAPER",
      certificateRequired: false,
      remarks: "",
    },
  });

  function onSubmit(data: ShredFormValues) {
    console.log(data);
    // Here you would typically send the data to your backend
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Shred Request Form</CardTitle>
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
                    <FormLabel>Shredding Date</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        date={field.value}
                        onDateChange={(newDate) => field.onChange(newDate)}
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
              <FormField
                control={form.control}
                name="shredLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shred Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a shred location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ON_SITE">On-site</SelectItem>
                        <SelectItem value="OFF_SITE">Off-site</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="itemType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an item type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PAPER">Paper</SelectItem>
                        <SelectItem value="HARD_DRIVE">Hard Drive</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="certificateRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Certificate of Destruction Required</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Check this if you need a certificate of destruction after
                      shredding.
                    </p>
                  </div>
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
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit Shredding Request
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
