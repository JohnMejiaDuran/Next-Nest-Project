import { getProduct } from "../products.api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"

type Params = Promise<{ id: string }>

async function ProductDetailPage (props: {params: Params}) {
    const params = await props.params
    const product = await getProduct(params.id)
    console.log(product)
    return <div
        className="flex justify-center items-center h-screen"
    >
        <Card>
            <CardHeader>
                    <CardTitle className="flex justify-between">
                        Product detail: {product.id}
                        <Link
                            className={buttonVariants()}
                            href="/"
                        >
                            Go back
                        </Link>
                    </CardTitle>
            </CardHeader>
            <CardContent>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <Image src={product.image} alt="pc" className="w-full h-80 object-cover w-70"/>
            </CardContent>
        </Card>
    </div>
}
export default ProductDetailPage