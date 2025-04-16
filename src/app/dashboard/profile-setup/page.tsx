"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/use-api";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  age: z.coerce
    .number()
    .int()
    .min(13, { message: "You must be at least 13 years old" })
    .max(120),
  gender: z.enum(["MALE", "FEMALE"]),
  height: z.coerce
    .number()
    .min(50, { message: "Height must be at least 50cm" })
    .max(250),
  currentWeight: z.coerce
    .number()
    .min(30, { message: "Weight must be at least 30kg" })
    .max(300),
  goalWeight: z.coerce
    .number()
    .min(30, { message: "Goal weight must be at least 30kg" })
    .max(300)
    .optional(),
  activityLevel: z.coerce.number().min(1).max(4),
  goal: z.enum(["WEIGHT_GAIN", "WEIGHT_LOSS", "MAINTENANCE"]),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function ProfileSetupPage() {
  const router = useRouter();
  const { profileAPI } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      age: undefined,
      gender: undefined,
      height: undefined,
      currentWeight: undefined,
      goalWeight: undefined,
      activityLevel: undefined,
      goal: undefined,
    },
  });

  async function onSubmit(data: ProfileValues) {
    setIsLoading(true);

    try {
      // Call the profile API endpoint
      const response = await profileAPI.createProfile({
        age: data.age,
        gender: data.gender,
        height: data.height,
        currentWeight: data.currentWeight,
        goalWeight: data.goalWeight,
        activityLevel: data.activityLevel,
        goal: data.goal,
      });

      if (response.success) {
        toast({
          title: "Profile completed!",
          description: "Your nutrition plan has been generated.",
        });

        router.push("/dashboard");
      } else {
        throw new Error(response.error?.message || "Profile setup failed");
      }
    } catch (error: any) {
      console.error("Profile setup error:", error);
      toast({
        title: "Something went wrong.",
        description:
          error.message || "Your profile could not be saved. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-md mx-auto py-8 px-4">
      <div className="space-y-4 text-center mb-6">
        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
        <p className="text-muted-foreground">
          We'll use this information to create your personalized nutrition plan
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="175" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="70" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="goalWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal Weight (kg) - Optional</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="65" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Level</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(Number.parseInt(value))
                  }
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your activity level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">
                      Sedentary (little or no exercise)
                    </SelectItem>
                    <SelectItem value="2">
                      Light (exercise 1-3 days/week)
                    </SelectItem>
                    <SelectItem value="3">
                      Moderate (exercise 3-5 days/week)
                    </SelectItem>
                    <SelectItem value="4">
                      Active (exercise 6-7 days/week)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitness Goal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="WEIGHT_LOSS">Weight Loss</SelectItem>
                    <SelectItem value="WEIGHT_GAIN">Weight Gain</SelectItem>
                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving profile..." : "Complete Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
