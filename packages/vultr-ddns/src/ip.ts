export async function getIPv4() {
  const response = await fetch('https://ipv4.icanhazip.com');
  return (await response.text()).trim();
}

export async function getIPv6() {
  const response = await fetch('https://ipv6.icanhazip.com');
  return (await response.text()).trim();
}
