import { Card, CardContent } from "./ui/card"

type Props = {
    title: string
    subtitle: string
    actions?: React.ReactNode
}



function PageHeader({ title, subtitle, actions }: Props) {
    return (
        <Card className="mb-4 bg-muted/40">
            <CardContent className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-muted-foreground">{subtitle}</p>
                </div>

                {actions && actions}
            </CardContent>
        </Card>
    )
}

export default PageHeader