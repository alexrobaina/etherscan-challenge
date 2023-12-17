import { Header } from '../../../../components/common/Header'

export const DashboardHeader: React.FC = () => {
  return (
    <header className="flex lg:flex-row md:justify-between flex-col gap-5">
      <Header title="Dashboard" />
    </header>
  )
}
