export const SectionComponent = ({ title, children }) => {
  return (
    <section className="p-4 shadow-lg mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </section>
  );
};
