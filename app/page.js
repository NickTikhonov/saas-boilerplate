import Image from 'next/image'
import Layout from './components/Layout'
import DateRangePicker from './components/general/DateRangePicker'

export default function Home() {
  return (
    <div>
      <Layout>
        <DateRangePicker />
      </Layout>
    </div>
  )
}
