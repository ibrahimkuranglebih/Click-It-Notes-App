import { AnimatedSubscribeButton } from "../magicui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

export function AnimatedSubscribeButtonDemo() {
  return (
    <AnimatedSubscribeButton className="group w-52 hover:shadow-lg hover:shadow-indigo-200 duration-300 ">
      <span className="inline-flex items-center">
        Get Started Now
        <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span></span>
    </AnimatedSubscribeButton>
  );
}
