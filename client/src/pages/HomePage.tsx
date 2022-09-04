import { useEffect, useState } from 'react'
import { FormWeight } from '../components/FormWeight'
import apiServices from '../services/services'

export default function HomePage() {
  const [names, setNames] = useState([])

  useEffect(() => {
    apiServices
      .getNames()
      .then((data) => setNames(data))
      .catch((e) => console.log(e))
  }, [])

  return (
    <>
      <h1>Lose Weight Progress</h1>
      <FormWeight names={names} />
    </>
  )
}
