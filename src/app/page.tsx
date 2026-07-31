import { AbstractPrinciples } from "@/components/sections/abstract-principles";
import { Contact } from "@/components/sections/contact";
import { MysteryHero } from "@/components/sections/mystery-hero";
import { PrivateDevelopment } from "@/components/sections/private-development";
import { ProductSignal } from "@/components/sections/product-signal";

export default function Home() {
  return (
    <>
      <MysteryHero />
      <ProductSignal />
      <AbstractPrinciples />
      <PrivateDevelopment />
      <Contact />
    </>
  );
}
