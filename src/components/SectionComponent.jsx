export const SectionComponent = ({ title, children }) => {
  return (
    <section className="p-4 shadow-lg dark:shadow-gray-500 mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </section>
  );
};
