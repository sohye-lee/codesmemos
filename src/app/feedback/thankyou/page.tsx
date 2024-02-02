import Button from "@/components/ui/button";
import Container from "@/components/ui/containers/container";
import { boxClassName } from "@/lib/constants";
import { IconHome } from "@tabler/icons-react";

export default function ThankYou() {
  return (
    <Container
      width="small"
      addClass="flex justify-center items-center min-h-[400px]"
    >
      <div
        className={`${boxClassName} py-8 px-12 flex flex-col min-w-[300px] gap-3`}
      >
        <p className="text-gray-600 text-sm text-center">Thank you!</p>
        <div className="flex justify-center">
          <Button
            link="/"
            button={false}
            size="medium"
            mode="black"
            addClass="mt-5 inline flex items-center gap-3 justify-center"
          >
            <IconHome width="16" />
            Go Home
          </Button>
        </div>
      </div>
    </Container>
  );
}
