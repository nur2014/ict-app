<template>
    <div>
        <div class="row mt-4">
            <div class="col-md-12 text-center">
                <h3 class="loading-text text-danger ministry-name">{{ $t('authentication.serverProblem') }}</h3>
                <div class="mt-5 font-weight-bold"><router-link to="/portal/home"><i class="ri-home-4-line"></i>{{ $t('globalTrans.back_to_home') }}</router-link></div>
            </div>
        </div>
    </div>
</template>
