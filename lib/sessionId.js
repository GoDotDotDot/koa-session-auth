module.exports = {
  set(ctx, name, value, opt) {
    if (opt.useToken) {
      ctx.response.set(name, value);
    }
    if (opt.useCookie) {
      ctx.cookies.set(name, value, opt);
    }
  },
  get(ctx, name, opt) {
    let token;
    if (opt.useToken) {
      token =  ctx.request.get(name);
    }
    if (!token && opt.useCookie) {
      token =  ctx.cookies.get(name, opt);
    }
    return token
  },

}