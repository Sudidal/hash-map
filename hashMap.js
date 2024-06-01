import { LinkedList } from "linked-list-oxide";

class HashMap {
  #buckets;
  #growFactor = 0.75;
  #defalutLength = 16;

  constructor(length = this.#defalutLength) {
    this.#buckets = [];
    this.#setBucketsArray(length);
  }

  set(key, value) {
    console.log("setting");
    this.#maintainBucketsLength();

    const hashCode = this.#hash(key);
    if (hashCode < 0 || hashCode >= this.#buckets.length) {
      throw new Error("Hash function generated invalid hashCode");
    }

    const bucket = this.#buckets[hashCode];
    const oldPair = bucket.getItemByKey(key);
    if (oldPair) {
      oldPair.setValue(value);
    } else {
      bucket.append(key, value);
    }
    console.log("completed setting");
  }
  get(key) {
    console.log("getting");
    const hashCode = this.#hash(key);
    const bucket = this.#buckets[hashCode];
    const item = bucket.getItemByKey(key);
    return item.getValue();
  }
  has(key) {
    console.log("hasing");
    const hashCode = this.#hash(key);
    const bucket = this.#buckets[hashCode];
    const item = bucket.getItemByKey(key);
    return item ? true : false;
  }
  length() {
    let count = 0;
    this.#buckets.forEach((bucket) => {
      count += bucket.getSize();
    });
    return count;
  }
  keys() {
    let keys = [];
    this.#buckets.forEach((bucket) => {
      const listLength = bucket.getSize();
      for (let i = 0; i < listLength; i++) {
        const item = bucket.getItemByIndex(i);
        if (item) {
          keys.push(item.getKey());
        }
      }
    });
    return keys;
  }
  values() {
    let values = [];
    this.#buckets.forEach((bucket) => {
      const listLength = bucket.getSize();
      for (let i = 0; i < listLength; i++) {
        const item = bucket.getItemByIndex(i);
        if (item) {
          values.push(item.getValue());
        }
      }
    });
    return values;
  }
  entries() {
    let entries = [];
    this.#buckets.forEach((bucket) => {
      const listLength = bucket.getSize();
      for (let i = 0; i < listLength; i++) {
        const item = bucket.getItemByIndex(i);
        if (item) {
          const pair = [item.getKey(), item.getValue()];
          entries.push(pair);
        }
      }
    });
    return entries;
  }
  clear() {
    this.#setBucketsArray(this.#defalutLength);
  }

  #maintainBucketsLength() {
    console.log("maintaining buckets length");
    const filledSlots = this.#buckets.filter(() => true);
    const resizeCondition = this.#buckets.length * this.#growFactor;
    if (filledSlots.length > resizeCondition) {
      this.#setBucketsArray(this.#buckets.length * 2);
    }
  }
  #setBucketsArray(length) {
    console.log("setting buckets array");
    this.#buckets.length = length;
    for (let i = 0; i < this.#buckets.length; i++) {
      if (!this.#buckets[i]) {
        this.#buckets[i] = new LinkedList();
      }
    }
  }
  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.#buckets.length;
    }

    return hashCode;
  }
}

export { HashMap };
