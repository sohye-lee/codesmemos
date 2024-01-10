import Container from "@/components/ui/container";
import useSWR from "swr";

export default function TopicCreatePage() {
    const {data, error } = useSWR('/api/topics');

    return ( 
        <Container width="small">
            <div>
                <form action="">

                </form>
            </div>
        </Container>
    )
}