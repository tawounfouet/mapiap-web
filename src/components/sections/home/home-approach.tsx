import { Eyebrow } from "@/components/ui/eyebrow";
import type { HomeApproachSectionContent } from "@/types/content";

export interface HomeApproachProps {
  content: HomeApproachSectionContent;
}

export function HomeApproach({ content }: HomeApproachProps) {
  return (
    <div className="lg:col-span-7">
      <Eyebrow>{content.eyebrow}</Eyebrow>
      <h2 className="text-brand-navy max-w-2xl text-[1.375rem] leading-[1.22] font-extrabold tracking-tight lg:text-[1.6rem]">
        {content.title}
      </h2>
      <ol className="before:bg-brand-teal/20 relative mt-5 grid grid-cols-4 gap-1.5 before:absolute before:top-4 before:right-[12.5%] before:left-[12.5%] before:h-px sm:gap-3">
        {content.steps.map((step, index) => (
          <li className="relative text-center" key={step.title}>
            <span
              className={
                index === 0
                  ? "bg-brand-navy relative mx-auto flex size-8 items-center justify-center rounded-full text-[0.6875rem] font-bold text-white shadow-sm ring-4 ring-white"
                  : index === content.steps.length - 1
                    ? "bg-brand-cyan text-brand-navy relative mx-auto flex size-8 items-center justify-center rounded-full text-[0.6875rem] font-bold shadow-sm ring-4 ring-white"
                    : "bg-brand-teal relative mx-auto flex size-8 items-center justify-center rounded-full text-[0.6875rem] font-bold text-white shadow-sm ring-4 ring-white"
              }
            >
              {index + 1}
            </span>
            <h3 className="text-brand-navy mt-2 text-[0.625rem] leading-4 font-bold sm:text-[0.6875rem] lg:text-xs">
              {step.title}
            </h3>
            <p className="text-brand-gray mt-1 hidden text-[0.6875rem] leading-4 md:block">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
