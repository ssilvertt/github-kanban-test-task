import { Input, rem } from '@mantine/core'
import styles from './App.module.css'
function App() {

  return (
    <div className={styles.сontainer}>
        <div className={styles.container__innerWithInput}>
            <Input placeholder='Enter github repo link' style={{width: rem('800px')}}/>
        </div>
        
    </div>
  )
}

export default App
