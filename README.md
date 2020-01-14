# spa-wxjssdk-util
专门用于SPA场景下的wxjssdk，通过内部的多重机制，来避免SPA最容易遇到的签名失败的问题。

0.1.0已经发布，正在使用和观察中，可能还有未知问题需要完善。

```
npm install spa-wxjssdk-util --save
npm install wxjssdk-copy --save
```

试用2天之后，发现有一个用户还是出现了签名错误的问题，产生原因还在排查中。

虽然理论上ios使用landingpage，安卓使用currentpage进行签名，但是在观察过程中，发现仍然有可能会出现签名失败的情况。 在签名算法正确地前提下，客户端出现签名错误的问题，基本上都是由于签名所使用的地址导致的。

这几天没出现问题了。
