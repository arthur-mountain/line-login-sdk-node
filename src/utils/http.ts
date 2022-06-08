import * as https from 'https'

export function httpGet({ url, customConfig = {} }) {
  const config = {
    method: 'GET',
    ...customConfig
  }

  return new Promise((resolve, reject) => {
    https
      .request(url, config, (res) => {
        const data = [];
        res
          .on('data', (d) => {
            data.push(d)
          })
          .on('end', () => {
            const response = Buffer.concat(data);
            resolve(response.toString('base64'))
          })
          .on('error', (error) => {
            reject({ type: 'responseErr', error })
          })
      })
      .on('error', (error) => {
        reject({ type: 'requestErr', error })
      })
      .end();
  })
}

export function httpPost({ url, data, customConfig = {} }) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Content-Length': Buffer.byteLength(data)
    },
    method: 'POST',
    ...customConfig
  }

  return new Promise((resolve, reject) => {
    const req = https
      .request(url, config, (res) => {
        const data = [];
        res
          .on('data', (d) => {
            data.push(d);
            console.log("🚀 ~ file: index.ts ~ line 64 ~ .on ~ Response: \n", d)
          })
          .on('end', () => {
            const response = Buffer.concat(data);
            resolve(response.toString())
          })
          .on('error', (error) => {
            reject({ type: 'responseErr', error })
          })
      })
      .on('error', (error) => {
        reject({ type: 'requestErr', error })
      })

    if (data) req.write(data);

    req.end();
  })
}