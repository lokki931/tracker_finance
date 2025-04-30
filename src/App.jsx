import PieChartComponent from "./components/PieChartComponent";
import { SectionComponent } from "./components/SectionComponent";
import { HeaderTotalComponent } from "./components/HeaderTotalComponent";
import { AddTransactionComponent } from "./components/AddTransactionComponent";
import { HistoryComponent } from "./components/HistoryComponent";
import { ModeToggle } from "./components/ModeToggle";

function App() {
  return (
    <div className="container m-auto flex flex-col items-center justify-center min-h-screen px-2">
      <div className="w-full bg-slate-100 dark:bg-black sm:w-6/12 p-4 shadow-lg">
        <ModeToggle />
        <SectionComponent title="Finance Tracker">
          <HeaderTotalComponent />
        </SectionComponent>
        <SectionComponent title="Add Transaction">
          <AddTransactionComponent />
        </SectionComponent>
        <SectionComponent title="Income vs Expenses">
          <PieChartComponent />
        </SectionComponent>
        <SectionComponent title="Transaction History">
          <HistoryComponent />
        </SectionComponent>
      </div>
    </div>
  );
}

export default App;
