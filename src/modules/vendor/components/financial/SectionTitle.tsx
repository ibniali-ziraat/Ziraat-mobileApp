import CsText from "@/src/components/shared/CsText";

export default function SectionTitle({ title }) {
  return (
    <CsText className="text-gray-800 font-semibold text-[16px] mb-2 mt-4">
      {title}
   </CsText>
  );
}
