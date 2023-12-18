export const formatEthBalance = (weiBalance: number) => {
  const ethBalance = weiBalance / 1e18 // Convert wei to ETH
  return ethBalance.toFixed(4) // 4 decimal places
}

export const formatExchangeRate = (rate: number) => {
  return rate.toFixed(4) // 4 decimal places, adjust as needed
}
