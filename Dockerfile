FROM ubuntu:20.04

### INPUTS ###

# You must have these available in the local folder with exactly these filenames!
ENV JDK_TAR_FILE=jdk-8u301-linux-x64.tar.gz
ENV ANDROID_TOOLS_ZIP=commandlinetools-linux-7583922_latest.zip
ENV ANDROID_NDK_ZIP=android-ndk-r22-linux-x86_64.zip
ENV ANDROID_NDK_FOLDER=android-ndk-r22

# Android API level 29 => Android 10
ENV ANDROID_API_LEVEL=29

##############

ENV JAVA_HOME=/usr/local/jdk1.8.0_301
ENV ANDROID_SDK_ROOT=/usr/local/android_sdk_root
ENV ANDROID_HOME=${ANDROID_SDK_ROOT}
ENV ANDROID_NDK_HOME=${ANDROID_SDK_ROOT}/ndk/${ANDROID_NDK_FOLDER}

# Install Java JDK
COPY ${JDK_TAR_FILE} /root
RUN cd /usr/local && tar xvfz /root/${JDK_TAR_FILE}
RUN rm /root/${JDK_TAR_FILE}

RUN apt update
RUN apt install unzip

# Install android SDK tools
COPY ${ANDROID_TOOLS_ZIP} /root
RUN mkdir -p /usr/local/android_sdk_root/cmdline-tools
RUN cd ${ANDROID_SDK_ROOT}/cmdline-tools && unzip /root/${ANDROID_TOOLS_ZIP} && mv cmdline-tools tools
RUN rm /root/${ANDROID_TOOLS_ZIP}

ENV PATH=${PATH}:${JAVA_HOME}/bin:${ANDROID_SDK_ROOT}/cmdline-tools/tools/bin

# Accept all SDK Manager licenses
RUN yes | sdkmanager --licenses

# Install latest platform tools and the SDK tools for the respective API level
RUN sdkmanager "platform-tools" "platforms;android-${ANDROID_API_LEVEL}"

# Install Android NDK
COPY ${ANDROID_NDK_ZIP} /root
RUN mkdir -p ${ANDROID_SDK_ROOT}/ndk && cd ${ANDROID_SDK_ROOT}/ndk && unzip /root/${ANDROID_NDK_ZIP}
RUN rm /root/${ANDROID_NDK_ZIP}
