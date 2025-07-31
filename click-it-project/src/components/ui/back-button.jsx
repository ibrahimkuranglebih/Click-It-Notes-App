import { AnimatedSubscribeButton } from "../magicui/animated-subscribe-button";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export function AnimatedBackButton() {
  return (
    <AnimatedSubscribeButton className="group w-fit duration-300 hover:bg-primary/90">
      <span className="inline-flex items-center">
        <ChevronLeftIcon className=" size-4 transition-transform duration-300 group-hover:-translate-x-1" />
      </span>
      <span></span>
    </AnimatedSubscribeButton>
  );
}
