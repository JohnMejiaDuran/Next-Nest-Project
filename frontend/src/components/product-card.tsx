"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { deleteProduct } from "@/app/products/products.api";
import { useRouter} from "next/navigation";
// import Image from "next/image";

export function ProductCard({product}: any) {
    const router = useRouter()

    async function handleRemoveProduct(id: string) {
        await deleteProduct(id)
        router.refresh();
    }

    return (
        <Card onClick={() => {
            router.push(`/products/${product.id}`)
        }}>
          <CardHeader>
            <CardTitle className="flex justify-between">
              {product.name}
              <span className="text-sm font-bold text-gray-500">
              ${product.price}
              </span>
            </CardTitle>
          </CardHeader>
          <img src={product.image} alt="PC" />
          {/* <Image src={product.image} alt="pc" width={300} height={300}/> */}
          <CardContent>
            <p>
              {product.description}
            </p>
            <CardFooter className="flex justify-between">
              <Button className="mt-5"
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/products/${product.id}/edit`)
                }}
              >
                Editar
              </Button>
              <Button className="mt-5" variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveProduct(product.id)
                }}
              >
                Eliminar
              </Button>
            </CardFooter>
            
            
          </CardContent>
        </Card>
    )
}