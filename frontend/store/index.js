const cookieparser = process.server ? require('cookieparser') : undefined;
export const actions = {
    nuxtServerInit({ commit }, { req, route, app, store }) {
        let auth = null;
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie);
            try {
                auth = parsed.auth;
            } catch (err) {
                // No valid cookie found
                console.log(err);
            }
        }
        commit('auth/setAuth', auth);
    }
};
