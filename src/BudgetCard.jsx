import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, ProgressBar } from 'react-bootstrap';
function BudgetCard() {
  return (
    <Card className='w-2/6 h-2/6'>
      <CardBody>
        <CardTitle>
          <div className='flex justify-between items-center'>
          <h2>Budget</h2>
          <h4>200/1000</h4>
          </div>
          </CardTitle>
          <ProgressBar className='rounded-pill bg-violet-400'></ProgressBar>
      </CardBody>
    </Card>
  )
}
export default BudgetCard;
