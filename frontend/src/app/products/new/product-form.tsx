"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useForm } from "react-hook-form"
import { createProduct, updateProduct } from "../products.api"
import { useParams, useRouter } from "next/navigation"


export function ProductForm({product}: any) {
    console.log(product)
    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: product?.name,
            description: product?.description,
            price: product?.price,
            image: product?.image
        }
    });
    const router = useRouter();
    const params = useParams<{id: string}>();
    console.log(params)

    const onSubmit = handleSubmit(async (data) => {
        if (params?.id) {
            const res = await updateProduct(params.id, {
                ...data,
                price: parseFloat(data.price)
            })
            console.log(res)
        }else {
            await createProduct({
                ...data,
                price: parseFloat(data.price)
            })
        }
        router.push("/")
        router.refresh()
    });

    return (
        <form onSubmit={onSubmit}>
                        <Label>
                            Product Name
                        </Label>
                        <Input 
                            {...register('name')}
                        />
                        <Label>
                            Description
                        </Label>
                        <Input 
                            {...register('description')}
                        />
                        <Label>
                            Price
                        </Label>
                        <Input 
                            {...register('price')}
                        />
                        <Label>
                            Image
                        </Label>
                        <Input 
                            {...register('image')}
                        />   
                        <Button className="mt-5">
                            {
                                params.id ? 'Update Product' : 'Create product'
                            }
                        </Button>
                    </form>
    )
}