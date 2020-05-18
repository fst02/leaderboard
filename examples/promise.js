async function wait(isSuccessful) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (isSuccessful) {
    return 10;
  }
  throw new Error('Hiba!');
  // return Promise.reject('Hiba!');
}

function f() {
  const bar = wait(false);

  console.log(bar);
  bar
    .then(result => console.log(result));
    .catch(error => console.log(error));
}

f();

async function g() {
  try {
    const result = await wait(false);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// g();
