<script lang="ts">

    import type { PageServerLoad } from './$types';
    import { getServerSession } from '@auth/sveltekit';

    export const load: PageServerLoad = async (event) => {
        const session = await getServerSession(event);
        return { session };
    };
</script>

mypage

