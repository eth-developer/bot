import logging
from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor
from aiogram.types import ParseMode
API_TOKEN = '6863563327:AAG1m_Iq6VjwN-VF_3INvd-WvoqPoz-GK7A'

logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)


@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)
    buttons = ["Pay with ETH", "Pay with BSC", "Settings"]
    keyboard.add(*buttons)
    
    await message.answer(
        "📌 Application cost $1200\n\n"
        "📌 Upon Confirmation of Payment, you will receive;\n"
        "🔻 Files\n"
        "🔻 Server\n"
        "🔻 Panel\n"
        "🔻 Backend\n"
        "🔻 Assistance\n"
        "🔻 How To Use Guide\n"
        f"<file unlock password: angeldrainsoft23>\n\n"
        "📌 Payment in USDT (Trc20 and ERC)",
        reply_markup=keyboard
    )


@dp.message_handler(lambda message: message.text == "Pay with ETH")
async def pay_with_eth(message: types.Message):
    await message.answer("You selected 'Pay with ETH.' Please proceed with the payment process.")


@dp.message_handler(lambda message: message.text == "Pay with BSC")
async def pay_with_bsc(message: types.Message):
    await message.answer(
        f"You selected 'Pay with BSC.' Please send the payment to the following BSC wallet address:\n{BSC_WALLET_ADDRESS}",
        reply_markup=types.ReplyKeyboardMarkup(resize_keyboard=True).add(
            types.KeyboardButton("PAID 💲"), types.KeyboardButton("STATUS 💲")
        )
    )


@dp.message_handler(lambda message: message.text == "Settings")
async def settings(message: types.Message):
    await message.answer("You selected 'Settings.' Please send your private wallet address to set it up.")


@dp.message_handler(lambda message: message.text == "PAID 💲")
async def paid(message: types.Message):
    await message.answer("Thank you for your payment! Please send the transaction hash.",
                         reply_markup=types.ReplyKeyboardRemove())


@dp.message_handler(lambda message: message.text == "STATUS 💲")
async def status(message: types.Message):
    await message.answer("Your current status is 'STATUS 💲.'", reply_markup=types.ReplyKeyboardRemove())


if __name__ == '__main__':
    from aiogram import executor
    executor.start_polling(dp, skip_updates=True)
