'use client'

import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from '../ui/textarea'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from 'lucide-react'


export const formSchema = z.object({
    model: z.string().nonempty("Model is required!"),

    prompt: z.string().nonempty("Prompt is required!"),

    guidance: z.number({ error: "Guidance scale is required!" }),

    num_output: z
        .number({ error: "Number of outputs is required!" })
        .min(1, "Number of outputs should be at least 1.")
        .max(4, "Number of outputs must be less than or equal to 4."),

    aspect_ratio: z.string().nonempty("Aspect ratio is required!"),

    output_format: z.string().nonempty("Output format is required!"),

    output_quality: z
        .number({ error: "Output quality is required!" })
        .min(50, "Output quality should be at least 50.")
        .max(100, "Output quality must be less than or equal to 100."),

    num_inference_steps: z
        .number({ error: "Inference steps are required!" })
        .min(1, "Inference steps should be at least 1.")
        .max(50, "Inference steps must be less than or equal to 50."),
});


const Configurations = () => {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            model: "black-forest-labs/flux-dev",
            prompt: "",
            guidance: 3.5,
            num_output: 1,
            output_format: "jpg",
            aspect_ratio: "1:1",
            output_quality: 80,
            num_inference_steps: 28,
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <fieldset className='grid gap-6 p-4 bg-background rounded-lg border'>
                    <legend className='text-sm -ml-1 px-1 font-medium'>Settings</legend>

                    {/* Model Field */}

                    <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex items-center gap-2'>

                                    Model

                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className='w-4 h-4' />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>You can select any model from the dropdown menu.</p>
                                        </TooltipContent>
                                    </Tooltip>

                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a model" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="black-forest-labs/flux-dev">Flux Dev</SelectItem>
                                        <SelectItem value="black-forest-labs/flux-schnell">Flux Schnell</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Aspect Ratio and Num of Output Field */}

                    <div className='grid grid-cols-2 gap-4'>
                        <FormField
                            control={form.control}
                            name="aspect_ratio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex items-center gap-2'>

                                        Aspect Ratio

                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className='w-4 h-4' />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Aspect ratio for the generated image.</p>
                                            </TooltipContent>
                                        </Tooltip>

                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a model" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1:1">1:1</SelectItem>
                                            <SelectItem value="16:9">16:9</SelectItem>
                                            <SelectItem value="9:16">9:16</SelectItem>
                                            <SelectItem value="21:9">21:9</SelectItem>
                                            <SelectItem value="9:21">9:21</SelectItem>
                                            <SelectItem value="4:5">4:5</SelectItem>
                                            <SelectItem value="5:4">5:4</SelectItem>
                                            <SelectItem value="4:3">4:3</SelectItem>
                                            <SelectItem value="3:4">3:4</SelectItem>
                                            <SelectItem value="2:3">2:3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="num_output"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex items-center gap-2'>

                                        Number of outputs


                                        <Tooltip>
                                            <TooltipTrigger >
                                                <Info className='w-4 h-4' />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Total number of output images to generate.</p>
                                            </TooltipContent>
                                        </Tooltip>

                                    </FormLabel>
                                    <FormControl>
                                        <Input type='number' min={1} max={4} {...field} onChange={(event) => field.onChange(+event.target.value)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    {/* Guidance Field */}

                    <FormField
                        control={form.control}
                        name="guidance"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        Guidance

                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className='w-4 h-4' />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Prompt guidance for generated image.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <span>
                                        {field.value}
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Slider defaultValue={[field.value]} min={0} max={10} step={0.5} onValueChange={value => field.onChange(value[0])} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* num_inference_steps Field */}

                    <FormField
                        control={form.control}
                        name="num_inference_steps"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>

                                        Number of Inference Steps

                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className='w-4 h-4' />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Number of denoising steps. Recommended range is 28-50 for dev model and 1-4 for schnell model.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <span>
                                        {field.value}
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Slider defaultValue={[field.value]} min={1} max={50} step={1} onValueChange={value => field.onChange(value[0])} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* output_quality Field */}

                    <FormField
                        control={form.control}
                        name="output_quality"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>

                                        Output Quality

                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className='w-4 h-4' />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Quality when saving the output image, from 0 to 100. 100 is best quality and 0 is lowest quality.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <span>
                                        {field.value}
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Slider defaultValue={[field.value]} min={50} max={100} step={1} onValueChange={value => field.onChange(value[0])} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Output Format Field */}

                    <FormField
                        control={form.control}
                        name="output_format"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex items-center gap-2'>

                                    Output Format

                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className='w-4 h-4' />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Format of the output images.</p>
                                        </TooltipContent>
                                    </Tooltip>


                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select output format" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="webp">WebP</SelectItem>
                                        <SelectItem value="png">PNG</SelectItem>
                                        <SelectItem value="jpg">JPG</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Prompt Field */}

                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex items-center gap-2'>

                                    Prompt


                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className='w-4 h-4' />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Prompt for generating images.</p>
                                        </TooltipContent>
                                    </Tooltip>


                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} rows={6} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='font-medium'>Generate</Button>

                </fieldset>

            </form>
        </Form>
    )
}

export default Configurations