import { Eyebrow } from "@/components/ui/eyebrow";
import type { HomeApproachSectionContent } from "@/types/content";

export interface HomeApproachProps {
  content: HomeApproachSectionContent;
}

export function HomeApproach({ content }: HomeApproachProps) {
  return (
    <div className="lg:col-span-7">
      <Eyebrow>{content.eyebrow}</Eyebrow>
      <h2 className="text-brand-navy max-w-2xl text-[1.75rem] leading-[1.2] font-extrabold tracking-tight lg:text-3xl">
        {content.title}
      </h2>
      <ol className="before:bg-brand-teal/20 relative mt-8 grid grid-cols-4 gap-2 before:absolute before:top-5 before:right-[12.5%] before:left-[12.5%] before:h-0.5 sm:gap-4">
        {content.steps.map((step, index) => (
          <li className="relative text-center" key={step.title}>
            <span
              className={
                index === 0
                  ? "bg-brand-navy relative mx-auto flex size-10 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ring-4 ring-white"
                  : index === content.steps.length - 1
                    ? "bg-brand-cyan text-brand-navy relative mx-auto flex size-10 items-center justify-center rounded-full text-xs font-bold shadow-sm ring-4 ring-white"
                    : "bg-brand-teal relative mx-auto flex size-10 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ring-4 ring-white"
              }
            >
              {index + 1}
            </span>
            <h3 className="text-brand-navy mt-3 text-[0.6875rem] leading-4 font-bold sm:text-xs lg:text-sm">
              {step.title}
            </h3>
            <p className="text-brand-gray mt-2 hidden text-xs leading-5 md:block">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
