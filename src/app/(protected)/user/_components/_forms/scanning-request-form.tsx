"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTimePicker } from "@/components/date-picker";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScanningFormValues, scanningSchema } from "@/schemas";
import { CustomPhoneInput } from "@/components/ui/phone-input";

export const ScanningRequestForm = () => {
  const form = useForm<ScanningFormValues>({
    resolver: zodResolver(scanningSchema),
    defaultValues: {
      date: new Date(),
      contactNo: "",
      contactPerson: "",
      documentType: "PAPER",
      pageCount: 1,
      scanResolution: "MEDIUM",
      remarks: "",
    },
  });

  function onSubmit(data: ScanningFormValues) {
    console.log(data);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Scanning Request Form
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
                    <FormLabel>Scanning Date</FormLabel>
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
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <CustomPhoneInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pageCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Pages</FormLabel>
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
                name="documentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a document type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PAPER">Paper</SelectItem>
                        <SelectItem value="BOOK">Book</SelectItem>
                        <SelectItem value="PHOTO">Photo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scanResolution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scan Resolution</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a scan resolution" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LOW">Low (72 DPI)</SelectItem>
                        <SelectItem value="MEDIUM">Medium (300 DPI)</SelectItem>
                        <SelectItem value="HIGH">High (600 DPI)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              Submit Scanning Request
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
