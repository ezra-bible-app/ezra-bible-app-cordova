FROM ubuntu:20.04

### INPUTS ###

# You must have these available in the local folder with exactly these filenames!
ENV JDK_TAR_FILE=jdk-8u301-linux-x64.tar.gz
ENV ANDROID_TOOLS_ZIP=commandlinetools-linux-7583922_latest.zip
# Android API level 29 => Android 10
ENV ANDROID_API_LEVEL=29

##############

ENV JAVA_HOME=/usr/local/jdk1.8.0_301
ENV ANDROID_SDK_ROOT=/usr/local/android_sdk_root

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
