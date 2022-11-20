import {forwardRef, useImperativeHandle, useState } from "react"

const Toggle = forwardRef(({children, buttonLabel}, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return(
    <div>
      <div style={hideWhenVisible}>
        <button className="nes-btn" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button className="nes-btn" onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>

  )
})

export default Toggle