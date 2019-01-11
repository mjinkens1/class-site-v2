import React from 'react'
import './styles.scss'

export const Syllabus = () => (
    <div className="container">
        <object
            style={{ background: 'transparent' }}
            data="https://firebasestorage.googleapis.com/v0/b/classsite-9148d.appspot.com/o/syllabus.pdf?alt=media&token=3849f546-bdf0-44d6-ae3f-9eace07d542e"
            type="application/pdf"
            width="100%"
            height="100%"
            aria-label="Syllabus"
        />
    </div>
)
