import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAddExpense } from "./use-add-expense";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AddExpenseUi() {
    const { form, onSubmit, isLoading } = useAddExpense();
    return (
        <div className="justify-items-center justify-self-center m-10">
            Hello "/add-expense/"!

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter description for your expense
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Amount" type="number" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter amount for your expense
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter category for your expense
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        variant="default"
                        className="w-full py-3 font-semibold rounded-md"
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        {isLoading ? (
                            <Loader2 className="justify-center align-middle animate-spin" />
                        ) : (
                            'Create'
                        )}
                    </Button>

                </form>
            </Form>

        </div>
    )
}