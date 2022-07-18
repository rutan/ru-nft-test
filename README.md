# NFT Test

ERC721 な NFT を作ってみるテスト

## Test

```
$ yarn install
$ yarn test
```

## Usages

### deploy
```
$ yarn hardhat run --network localhost scripts/deploy.ts
```

### mint
```
$ CONTRACT_ADDRESS=xxxxxx TARGET_ADDRESS=yyyyyy yarn hardhat run --network localhost scripts/mint.ts
```

### show all tokens
```
$ CONTRACT_ADDRESS=xxxxxx yarn hardhat run --network localhost scripts/show.ts
```
