import dotenv from 'dotenv'
import { client } from './client'
import { setTimeout } from './services/setTimeout'
import { CounterA } from './utils'
import { CounterB } from './utils'

dotenv.config()
client.connect()

client.on('message', async (channel, tags, message) => {
  const [command, counter] = message.split(' ')
  const currentNumber = parseInt(counter)
  const user_id = parseInt(tags['user-id']!)

  if (command.toLocaleLowerCase() === '!plomo') {
    if (currentNumber === CounterA.getValue() + 1) {
      CounterA.increment()
    } else {
      setTimeout(user_id, currentNumber === 0 ? 1 : currentNumber)
      CounterA.reset()
    }
  }
  if (command.toLocaleLowerCase() === '!jesucristo') {
    if (currentNumber === CounterB.getValue() + 1) {
      CounterB.increment()
    } else {
      setTimeout(user_id, currentNumber === 0 ? 1 : currentNumber)
      CounterB.reset()
    }
  }
})

