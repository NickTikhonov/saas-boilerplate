'use client'

import { useState } from "react"
import Datepicker from "tailwind-datepicker-react"

export default function DateRangePicker({ onChange, date }) {
	const [show, setShow] = useState(false)
	const handleClose = (state) => {
		setShow(state)
	}

  const options = {
    theme: {
      text: "text-gray-600 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-100 dark:hover:text-white",
      todayBtn: "bg-primo-500 hover:bg-primo-600 text-white dark:bg-primo-500 dark:hover:bg-indigo-600",
      icons: "text-black dark:text-black hover:bg-gray-200",
      selected: "bg-primo-400 dark:bg-primo-400 dark:text-white",
    },
    clearBtn: false,
  }

	return (
		<div>
			<Datepicker options={{...options, defaultDate: date }} onChange={onChange} show={show} setShow={handleClose} />
		</div>
	)
}