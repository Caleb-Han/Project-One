
  function displayDuration(seconds) {
    const dict = {}
    dict[hours] = Math.floor(seconds / 3600)
    dict[minutes] = Math.floor((seconds - dict[hours] * 3600)/60)
    return (`${dict[hours]}:${dict[minutes]}`)
  }