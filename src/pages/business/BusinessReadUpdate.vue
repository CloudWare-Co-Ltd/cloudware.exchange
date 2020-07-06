<template>
  <q-dialog v-model="isShow" persistent :maximized="maximizedToggle" transition-show="slide-up"
            transition-hide="slide-down">
    <q-card>
      <q-bar>
        <span class="text-subtitle1">
          <strong>ព័ត៌មានរបស់</strong>
          {{data.full_name}} - {{data.full_name_latin}} (ID:{{data.official_no}})
        </span>
        <q-space/>
        <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
          <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
          <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-card flat bordered class="bg-grey-1">
          <q-card-section>
            <q-tabs
              align="left"
              v-model="tab"
              inline-label
              class="bg-primary text-white shadow-2"
            >
              <q-tab name="personal_info" icon="person" label="ព័ត៌មានផ្ទាល់ខ្លួន" no-caps/>
              <q-tab name="job_status" icon="toggle_on" label="ស្ថានភាពការងារ" no-caps/>
              <q-tab name="family_info" icon="group" label="ព័ត៌មានគ្រួសារ" no-caps/>
              <q-tab name="study_info" icon="school" label="ព័ត៌មានការសិក្សា" no-caps/>
              <q-tab name="permission" icon="note" label="ព័ត៌មានសំុច្បាប់" no-caps/>
              <q-tab name="position_info" icon="show_chart" label="ព័ត៌មានមុខតំណែង" no-caps/>
              <q-tab name="job_history" icon="history" label="ព័ត៌មានប្រវត្តិការងារ" no-caps/>
              <q-tab name="blame_praise" icon="bookmark" label="ព័ត៌មានសរសើរ/ស្តីបន្ទោស" no-caps/>
            </q-tabs>
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="personal_info" class="q-gutter-y-sm">
                <q-img
                  :src="data.hostname+data.photo"
                  style="height: 200px; max-width: 200px"
                >
                  <div class="absolute-bottom text-right no-padding">
                    <q-btn icon="edit" label="កែប្រែ" flat>
                      <q-popup-edit v-model="photo_prev">
                        <q-file style="width: 300px"
                                label="ជ្រើសរើសរូបភាព"
                                outlined
                                v-model="photo_prev"
                                square
                                accept="image/*"
                                dense
                                @input="photoFn"
                                lazy-rules
                                :rules="[ val => !!val || 'សូមជ្រើសរើស']">
                          <template v-slot:prepend>
                            <q-icon name="attach_file"/>
                          </template>
                        </q-file>
                      </q-popup-edit>
                    </q-btn>
                  </div>
                </q-img>
                <q-table
                  title="ព័ត៌មានទូទៅ"
                  :data="personal_data"
                  :columns="columns_default"
                  :rows-per-page-options="[0]"
                  hide-bottom
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="staff_type" :props="props">
                        {{ props.row.staff_type }}
                        <q-popup-edit v-model="props.row.staff_type">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-select
                              class="col"
                              outlined
                              label="ប្រភេទបុគ្គលិក"
                              :options="Object.freeze(getStaffTypes)"
                              square
                              @keyup.enter.stop v-model="props.row.staff_type" dense autofocus>
                              <template v-slot:after>
                                <q-btn round dense flat icon="add" color="primary" @click="$refs.addStaffType.show()"/>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{staff_type:props.row.staff_type}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-select>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="lname" :props="props">
                        {{ props.row.lname }}
                        <q-popup-edit v-model="props.row.lname">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.lname" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{lname:props.row.lname}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="fname" :props="props">
                        {{ props.row.fname }}
                        <q-popup-edit v-model="props.row.fname">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.fname" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{fname:props.row.fname}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="lname_latin" :props="props">
                        {{ props.row.lname_latin }}
                        <q-popup-edit v-model="props.row.lname_latin">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.lname_latin" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{lname_latin:props.row.lname_latin}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="fname_latin" :props="props">
                        {{ props.row.fname_latin }}
                        <q-popup-edit v-model="props.row.fname_latin">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.fname_latin" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{fname_latin:props.row.fname_latin}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="gender" :props="props">
                        {{ props.row.gender }}
                        <q-popup-edit v-model="props.row.gender">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-select @keyup.enter.stop
                                      outlined
                                      v-model="props.row.gender"
                                      label="ភេទ"
                                      :options="Object.freeze(['ប្រុស','ស្រី'])"
                                      square>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{gender:props.row.gender}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-select>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="dob" :props="props">
                        {{ props.row.dob }}
                        <q-popup-edit v-model="props.row.dob">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input
                              outlined
                              v-model="props.row.dob"
                              label="ថ្ងៃខែឆ្នាំកំណើត"
                              square
                              lazy-rules
                              mask="##/##/####" :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy ref="dateDOB" transition-show="scale" transition-hide="scale">
                                    <q-date mask="DD/MM/YYYY" v-model="props.row.dob"
                                            @input="() => $refs.dateDOB.hide()"/>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{dob:props.row.dob}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="skill" :props="props">
                        {{ props.row.skill }}
                        <q-popup-edit v-model="props.row.skill">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.skill" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{skill:props.row.skill}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="national_id" :props="props">
                        {{ props.row.national_id }}
                        <q-popup-edit v-model="props.row.national_id">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.national_id" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{national_id:props.row.national_id}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="official_no" :props="props">
                        {{ props.row.official_no }}
                        <q-popup-edit v-model="props.row.official_no">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.official_no" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{official_no:props.row.official_no}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
                <q-table
                  :data="personal_data"
                  :columns="columns_default_two"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  hide-bottom
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="nssf_no" :props="props">
                        {{ props.row.nssf_no }}
                        <q-popup-edit v-model="props.row.nssf_no">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.nssf_no" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{nssf_no:props.row.nssf_no}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="amcek_no" :props="props">
                        {{ props.row.amcek_no }}
                        <q-popup-edit v-model="props.row.amcek_no">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.amcek_no" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{amcek_no:props.row.amcek_no}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="bank_account_no" :props="props">
                        {{ props.row.bank_account_no }}
                        <q-popup-edit v-model="props.row.bank_account_no">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.bank_account_no" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{bank_account_no:props.row.bank_account_no}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="bank_name" :props="props">
                        {{ props.row.bank_name }}
                        <q-popup-edit v-model="props.row.bank_name">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.bank_name" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{bank_name:props.row.bank_name}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="start_work" :props="props">
                        {{ props.row.start_work }}
                        <q-popup-edit v-model="props.row.start_work">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input
                              outlined
                              v-model="props.row.start_work"
                              label="ថ្ងៃខែឆ្នាំចូលបម្រើការងាររដ្ឋ"
                              square
                              lazy-rules
                              mask="##/##/####" :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy ref="dateDOB" transition-show="scale" transition-hide="scale">
                                    <q-date mask="DD/MM/YYYY" v-model="props.row.start_work"
                                            @input="() => $refs.dateDOB.hide()"/>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{start_work:props.row.start_work}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="real_appointment" :props="props">
                        {{ props.row.real_appointment }}
                        <q-popup-edit v-model="props.row.real_appointment">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input
                              outlined
                              v-model="props.row.real_appointment"
                              label="ថ្ងៃខែឆ្នាំតែងតាំងស៊ប់"
                              square
                              lazy-rules
                              mask="##/##/####" :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy ref="dateDOB" transition-show="scale" transition-hide="scale">
                                    <q-date mask="DD/MM/YYYY" v-model="props.row.real_appointment"
                                            @input="() => $refs.dateDOB.hide()"/>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{real_appointment:props.row.real_appointment}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>

                      <q-td key="course" :props="props">
                        {{ props.row.course.join(', ') }}
                        <q-popup-edit v-model="props.row.course">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">

                            <q-select class="col"
                                      outlined
                                      multiple
                                      v-model="props.row.course"
                                      label="មុខវិជ្ជាបង្រៀន"
                                      :options="Object.freeze(courseOption)"
                                      use-input
                                      @filter="filterFnCourse"
                                      square
                                      lazy-rules
                                      :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                              <template v-slot:after>
                                <q-btn dense flat icon="add" color="primary" @click="$refs.addCourse.show()"/>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{course:props.row.course}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-select>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="education_system" :props="props">
                        {{ props.row.education_system }}
                        <q-popup-edit v-model="props.row.education_system">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">

                            <q-select class="col"
                                      outlined
                                      v-model="props.row.education_system"
                                      label="ប្រព័ន្ធបណ្តុះបណ្តាល"
                                      :options="Object.freeze(educationSystemOption)"
                                      use-input
                                      @filter="filterFnEducationSystem"
                                      square
                                      lazy-rules
                                      :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                              <template v-slot:after>
                                <q-btn dense flat icon="add" color="primary" @click="$refs.addCourse.show()"/>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{education_system:props.row.education_system}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-select>
                          </template>
                        </q-popup-edit>
                      </q-td>

                    </q-tr>
                  </template>
                </q-table>
                <q-table
                  title="ទំនាក់ទំនង"
                  :data="personal_data"
                  :columns="columns_contact"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  hide-bottom
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="email" :props="props">
                        {{ props.row.email }}
                        <q-popup-edit v-model="props.row.email">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.email" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{email:props.row.email}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="tel" :props="props">
                        {{ props.row.tel }}
                        <q-popup-edit v-model="props.row.tel">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.tel" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{tel:props.row.tel}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="telegram" :props="props">
                        {{ props.row.telegram }}
                        <q-popup-edit v-model="props.row.telegram">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.telegram" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{telegram:props.row.telegram}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="facebook" :props="props">
                        {{ props.row.facebook }}
                        <q-popup-edit v-model="props.row.facebook">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input @keyup.enter.stop v-model="props.row.facebook" dense autofocus>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{facebook:props.row.facebook}})"
                                       :disable="initialValue === value"/>
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
                <q-table
                  title="អាស័យដ្ឋាន"
                  :data="address_data"
                  :columns="columns_address"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  hide-bottom
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="type" :props="props">
                        {{ props.row.type }}
                      </q-td>
                      <q-td key="province" :props="props">
                        {{ props.row.province }}
                      </q-td>
                      <q-td key="district" :props="props">
                        {{ props.row.district }}
                      </q-td>
                      <q-td key="commune" :props="props">
                        {{ props.row.commune }}
                      </q-td>
                      <q-td key="village" :props="props">
                        {{ props.row.village }}
                      </q-td>
                      <q-td key="_id" :props="props">
                        <q-btn dense round flat color="primary" icon="edit"/>
                        <q-popup-edit v-model="props.row._id" :validate="val => !!val">
                          <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-select
                              use-input
                              @filter="filterFnAddressBook"
                              outlined
                              v-model="props.row._id"
                              label="ជ្រើសរើស អាស័យដ្ឋាន"
                              :options="Object.freeze(optionsAddressBook)"
                              square>
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                                <q-btn v-if="props.row.type==='ទីកន្លែងកំណើត'" flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{pob_address_book:props.row._id.value}})"
                                       :disable="validate(value) === false || initialValue === value"/>

                                <q-btn v-if="props.row.type==='អាស័យដ្ឋានបច្ចុប្បន្ន'" flat dense color="positive" icon="check_circle" @click.stop="set"
                                       @click="updateStaff({id:data._id,data:{current_address_book:props.row._id.value}})"
                                       :disable="validate(value) === false || initialValue === value"/>
                              </template>
                            </q-select>
                          </template>
                        </q-popup-edit>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-tab-panel>

              <q-tab-panel name="job_status">
                <q-table
                  :data="getJobStatuses"
                  :columns="columns_job_status"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  hide-bottom
                >
                  <template v-slot:top>
                    <span class="text-h6">ព័ត៌មានស្ថានភាពការងារ</span>
                    <q-btn icon="add" round flat color="secondary" @click="$refs.addJobStatus.show(data._id)"/>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="type" :props="props">
                        {{ props.row.type }}
                      </q-td>
                      <q-td key="description" :props="props">
                        {{ props.row.description }}
                      </q-td>
                      <q-td key="date" :props="props">
                        {{ props.row.date }}
                      </q-td>
                      <q-td key="_id" :props="props">
                        <q-btn icon="delete" color="negative" flat dense round
                               @click="deleteJobStatus(props.row._id)"/>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-tab-panel>

              <q-tab-panel name="family_info">
                <q-table
                  :data="getFamilies"
                  :columns="columns_family"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  hide-bottom
                >
                  <template v-slot:top>
                    <span class="text-h6">ព័ត៌មានគ្រួសារ</span>
                    <q-btn icon="add" round flat color="secondary" @click="$refs.addFamily.show(data._id)"/>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="type" :props="props">
                        {{ props.row.type }}
                      </q-td>
                      <q-td key="name" :props="props">
                        {{ props.row.name }}
                      </q-td>
                      <q-td key="dob" :props="props">
                        {{ props.row.dob }}
                      </q-td>
                      <q-td key="job" :props="props">
                        {{ props.row.job }}
                      </q-td>
                      <q-td key="organization" :props="props">
                        {{ props.row.organization }}
                      </q-td>
                      <q-td key="_id" :props="props">
                        <q-btn icon="delete" color="negative" flat dense round @click="deleteFamily(props.row._id)"/>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-tab-panel>

              <q-tab-panel name="study_info">
                <q-table
                  :data="getEducationInfos"
                  :columns="columns_education"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  hide-bottom
                >
                  <template v-slot:top>
                    <span class="text-h6">ព័ត៌មានការសិក្សា</span>
                    <q-btn icon="add" round flat color="secondary" @click="$refs.addEducationInfo.show(data._id)"/>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="type" :props="props">
                        {{ props.row.type }}
                      </q-td>
                      <q-td key="skill" :props="props">
                        {{ props.row.skill }}
                      </q-td>
                      <q-td key="place" :props="props">
                        {{ props.row.place }}
                      </q-td>
                      <q-td key="date_start" :props="props">
                        {{ props.row.date_start }}
                      </q-td>
                      <q-td key="date_end" :props="props">
                        {{ props.row.date_end }}
                      </q-td>
                      <q-td key="attachment" :props="props">
                        <a target="_blank" :href="`${props.row.hostname}${props.row.attachment}`">View attachment</a>
                      </q-td>
                      <q-td key="_id" :props="props">
                        <q-btn icon="delete" color="negative" flat dense round
                               @click="deleteEducationInfo(props.row._id)"/>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-tab-panel>

              <q-tab-panel name="permission">
                <q-table
                  :data="getPermissionInfos"
                  :columns="columns_permission"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  hide-bottom
                >
                  <template v-slot:top>
                    <span class="text-h6">ព័ត៌មានព្យួរការងារ សំុច្បាប់បន្តការសិក្សា និងសំុអនុញ្ញាតច្បាប់ផ្សេងៗ...</span>
                    <q-btn icon="add" round flat color="secondary" @click="$refs.addPermissionInfo.show(data._id)"/>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="type" :props="props">
                        {{ props.row.type }}
                      </q-td>
                      <q-td key="date_start" :props="props">
                        {{ props.row.date_start }}
                      </q-td>
                      <q-td key="date_end" :props="props">
                        {{ props.row.date_end }}
                      </q-td>
                      <q-td key="attachment_date" :props="props">
                        {{ props.row.attachment_date }}
                      </q-td>
                      <q-td key="attachment" :props="props">
                        <a target="_blank" :href="`${props.row.hostname}${props.row.attachment}`">View attachment</a>
                      </q-td>
                      <q-td key="_id" :props="props">
                        <q-btn icon="delete" color="negative" flat dense round
                               @click="deletePermissionInfo(props.row._id)"/>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-tab-panel>

              <q-tab-panel name="position_info">
                <q-table
                  :data="getPositionInfos"
                  :columns="columns_position"
                  :rows-per-page-options="[0]"
                  hide-bottom
                >
                  <template v-slot:top>
                    <span class="text-h6">ព័ត៌មានមុខតំណែង និងតួនាទី</span>
                    <q-btn icon="add" round flat color="secondary" @click="$refs.addPositionInfo.show(data._id)"/>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="office" :props="props">
                        {{ props.row.office }}
                      </q-td>
                      <q-td key="position" :props="props">
                        {{ props.row.position }}
                      </q-td>
                      <q-td key="salary_position" :props="props">
                        {{ props.row.salary_position }}
                      </q-td>
                      <q-td key="salary_position_date" :props="props">
                        {{ props.row.salary_position_date }}
                      </q-td>
                      <q-td key="_id" :props="props">
                        <q-btn icon="delete" color="negative" flat dense round
                               @click="deletePositionInfo(props.row._id)"/>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-tab-panel>

              <q-tab-panel name="job_history">
                <q-table
                  :data="getJobHistories"
                  :columns="columns_job_histories"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  hide-bottom
                >
                  <template v-slot:top>
                    <span class="text-h6">ព័ត៌មានប្រវត្តិការងារ</span>
                    <q-btn icon="add" round flat color="secondary" @click="$refs.addJobHistory.show(data._id)"/>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="name" :props="props">
                        {{ props.row.name }}
                      </q-td>
                      <q-td key="date_start" :props="props">
                        {{ props.row.date_start }}
                      </q-td>
                      <q-td key="date_end" :props="props">
                        {{ props.row.date_end }}
                      </q-td>
                      <q-td key="_id" :props="props">
                        <q-btn icon="delete" color="negative" flat dense round
                               @click="deleteJobHistory(props.row._id)"/>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-tab-panel>

              <q-tab-panel name="blame_praise">
                <q-table
                  :data="getBlamePraises"
                  :columns="columns_blame_praises"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  hide-bottom
                >
                  <template v-slot:top>
                    <span class="text-h6">ព័ត៌មានប្រវត្តិសរសើរ/ស្តីបន្ទោស</span>
                    <q-btn icon="add" round flat color="secondary" @click="$refs.addBlamePraise.show(data._id)"/>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="type" :props="props">
                        {{ props.row.type }}
                      </q-td>
                      <q-td key="description" :props="props">
                        {{ props.row.description }}
                      </q-td>
                      <q-td key="date" :props="props">
                        {{ props.row.date }}
                      </q-td>
                      <q-td key="attachment" :props="props">
                        <a target="_blank" :href="`${props.row.hostname}${props.row.attachment}`">View attachment</a>
                      </q-td>
                      <q-td key="_id" :props="props">
                        <q-btn icon="delete" color="negative" flat dense round
                               @click="deleteBlamePraise(props.row._id)"/>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn class="full-width" color="primary" icon="printer" @click="printStaffCV(data._id)">
              <q-tooltip content-class="bg-white text-primary">បោះពុម្ភ</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>

  const columns_default = [
    {align: 'left', name: 'staff_type', label: 'នាមត្រកូល', field: 'staff_type'},
    {align: 'left', name: 'lname', label: 'នាមត្រកូល', field: 'lname'},
    {align: 'left', name: 'fname', label: 'នាមខ្លួន', field: 'fname'},
    {align: 'left', name: 'lname_latin', label: 'នាមត្រកូលឡាតាំង', field: 'lname_latin'},
    {align: 'left', name: 'fname_latin', label: 'នាមខ្លួនឡាតាំង', field: 'fname_latin'},
    {align: 'left', name: 'gender', label: 'ភេទ', field: 'gender'},
    {align: 'left', name: 'dob', label: 'ថ្ងៃខែឆ្នាំកំណើត', field: 'dob'},
    {align: 'left', name: 'skill', label: 'ឯកទេស(អប់រំ)', field: 'calcium'},
    {align: 'left', name: 'national_id', label: 'លេខអត្តសញ្ញាណប័ណ្ឌ', field: 'national_id'},
    {align: 'left', name: 'official_no', label: 'អត្តលេខមន្ត្រីរាជការ', field: 'official_no'},
  ];

  const columns_default_two = [
    {align: 'left', name: 'nssf_no', label: 'លេខបសស', field: 'nssf_no'},
    {align: 'left', name: 'amcek_no', label: 'លេខសបសខ', field: 'amcek_no'},
    {align: 'left', name: 'bank_account_no', label: 'លេខគណនីធនាគារ', field: 'bank_account_no'},
    {align: 'left', name: 'bank_name', label: 'ឈ្មោះធនាគា', field: 'bank_name'},
    {align: 'left', name: 'start_work', label: 'ចូលបម្រើការងាររដ្ឋ', field: 'start_work'},
    {align: 'left', name: 'real_appointment', label: 'តែងតាំងស៊ប់', field: 'real_appointment'},
    {align: 'left', name: 'course', label: 'មុខវិជ្ជា', field: 'course'},
    {align: 'left', name: 'education_system', label: 'ប្រព័ន្ធបណ្តុះបណ្តាល', field: 'education_system'},
  ];
  const columns_contact = [
    {align: 'left', name: 'email', label: 'អ៊ីម៉ែល', field: 'email'},
    {align: 'left', name: 'tel', label: 'លេខទូរស័ព្ទ', field: 'tel'},
    {align: 'left', name: 'telegram', label: 'Telegram', field: 'telegram'},
    {align: 'left', name: 'facebook', label: 'Facebook', field: 'facebook'},
  ];

  const columns_address = [
    {align: 'left', name: 'type', label: 'ប្រភេទ', field: 'type'},
    {align: 'left', name: 'province', label: 'ខេត្ត/ក្រុង', field: 'province'},
    {align: 'left', name: 'district', label: 'ស្រុក/ខណ្ឌ', field: 'district'},
    {align: 'left', name: 'commune', label: 'ឃំុ/សង្កាត់', field: 'commune'},
    {align: 'left', name: 'village', label: 'ភូមិ', field: 'village'},
    {align: 'left', name: '_id', field: '_id'},
  ];

  const columns_job_status = [
    {align: 'left', name: 'type', label: 'ប្រភេទ', field: 'type'},
    {align: 'left', name: 'description', label: 'បរិយាយ', field: 'description'},
    {align: 'left', name: 'date', label: 'ថ្ងៃខែឆ្នាំ', field: 'date'},
    {align: 'left', name: '_id', field: '_id'},
  ];

  const columns_education = [
    {align: 'left', name: 'type', label: 'ប្រភេទ', field: 'type'},
    {align: 'left', name: 'skill', label: 'ឯកទេស/ប្រភេទសញ្ញាបត្រ', field: 'skill'},
    {align: 'left', name: 'place', label: 'ទីកន្លែងបណ្តុះបណ្តាល', field: 'place'},
    {align: 'left', name: 'date_start', label: 'ថ្ងៃខែឆ្នាំចាប់ផ្តើម', field: 'date_start'},
    {align: 'left', name: 'date_end', label: 'ថ្ងៃខែឆ្នាំបញ្ចប់', field: 'date_end'},
    {align: 'left', name: 'attachment', label: 'ឯកសារភ្ជាប់', field: 'attachment'},
    {align: 'left', name: '_id', field: '_id'},
  ];

  const columns_blame_praises = [
    {align: 'left', name: 'type', label: 'ប្រភេទ', field: 'type'},
    {align: 'left', name: 'description', label: 'បរិយាយ', field: 'description'},
    {align: 'left', name: 'date', label: 'ថ្ងៃខែឆ្នាំ', field: 'date'},
    {align: 'left', name: 'attachment', label: 'ឯកសារភ្ជាប់', field: 'attachment'},
    {align: 'left', name: '_id', field: '_id'},
  ];

  const columns_job_histories = [
    {align: 'left', name: 'name', label: 'ប្រវត្តិការងារក្នុងស្ថាប័នរដ្ឋ', field: 'name'},
    {align: 'left', name: 'date_start', label: 'ថ្ងៃខែឆ្នាំចាប់ផ្តើម', field: 'date_start'},
    {align: 'left', name: 'date_end', label: 'ថ្ងៃខែឆ្នាំបញ្ចប់', field: 'date_end'},
    {align: 'left', name: '_id', field: '_id'},
  ];

  const columns_family = [
    {align: 'left', name: 'type', label: 'ប្រភេទ', field: 'type'},
    {align: 'left', name: 'name', label: 'ឈ្មោះ', field: 'name'},
    {align: 'left', name: 'dob', label: 'ថ្ងៃខែឆ្នាំកំណើត', field: 'dob'},
    {align: 'left', name: 'job', label: 'មុខរបរ់', field: 'job'},
    {align: 'left', name: 'organization', label: 'អង្គភាព', field: 'organization'},
    {align: 'left', name: '_id', field: '_id'},
  ];
  const columns_permission = [
    {align: 'left', name: 'type', label: 'ប្រភេទ', field: 'type'},
    {align: 'left', name: 'date_start', label: 'ថ្ងៃខែឆ្នាំចាប់ផ្តើម', field: 'date_start'},
    {align: 'left', name: 'date_end', label: 'ថ្ងៃខែឆ្នាំបញ្ចប់', field: 'date_end'},
    {align: 'left', name: 'attachment_date', label: 'ថ្ងៃខែឆ្នាំលិខិតអនុញ្ញាត', field: 'attachment_date'},
    {align: 'left', name: 'attachment', label: 'ឯកសារភ្ជាប់', field: 'attachment'},
    {align: 'left', name: '_id', field: '_id'},
  ];
  const columns_position = [
    {align: 'left', name: 'office', label: 'ការិយាល័យ/មហាវិទ្យាល័យ', field: 'office'},
    {align: 'left', name: 'position', label: 'មុខដំណែង', field: 'position'},
    {align: 'left', name: 'salary_position', label: 'ប្រភេទកាំប្រាក់ និងកម្រិតថ្នាក់', field: 'salary_position'},
    {
      align: 'left',
      name: 'salary_position_date',
      label: 'ថ្ងៃខែឆ្នាំឡើងកាំបៀរត្សចុងក្រោយ',
      field: 'salary_position_date'
    },
    {align: 'left', name: '_id', field: '_id'},
  ];
  export default {
    name: "BusinessReadUpdate",
    data() {
      return {
        pagination: {
          page: 1,
          rowsPerPage: 0 // 0 means all rows
        },
        isShow: false,
        tab: 'personal_info',
        maximizedToggle: true,
        data: {
          _id: null,
          full_name: '',
          full_name_latin: '',
          official_no: '',
          hostname: '',
          photo: ''
        },
        dataPhoto: new FormData(),
        photo_prev: null,
        columns_default,
        columns_default_two,
        columns_contact,
        columns_address,
        columns_family,
        columns_education,
        columns_permission,
        columns_job_status,
        columns_position,
        columns_job_histories,
        columns_blame_praises,
        personal_data: [],
        address_data: [],
        optionsAddressBook: [],
        courseOption:[],
        educationSystemOption:[]
      }
    },
    computed: {
      getEducationSystems() {
        let self = this;
        return self.$store.getters['education_system/getEducationSystem'].map(function (x) {
          return x.name
        })
      },
      getStaffTypes() {
        let self = this;
        return self.$store.getters['staff_type/getStaffType'].map(function (x) {
          return x.type
        })
      },
      getCourses() {
        let self = this;
        return self.$store.getters['course/getCourse'].map(function (x) {
          return x.name
        })
      },
      getBlamePraises() {
        return this.$store.getters['blame_praise/getBlamePraise']
      },
      getJobStatuses() {
        return this.$store.getters['job_status/getJobStatus']
      },
      getJobHistories() {
        return this.$store.getters['job_history/getJobHistory']
      },
      getPositionInfos() {
        return this.$store.getters['position_info/getPositionInfo']
      },
      getPermissionInfos() {
        return this.$store.getters['permission_info/getPermissionInfo']
      },
      getFamilies() {
        return this.$store.getters['family/getFamily']
      },
      getEducationInfos() {
        return this.$store.getters['education_info/getEducationInfo']
      },
      getAddressBooks() {
        return this.$store.getters['address_book/getAddressBook'].map(function (x) {
          return {
            value: x._id,
            label: `${x.province} - ${x.district} - ${x.commune} - ${x.village}`
          }
        })
      },
    },
    methods: {
      show(data) {
        this.isShow = true;
        this.data._id = data.row._id;
        this.data.full_name = data.row.full_name;
        this.data.full_name_latin = data.row.full_name_latin;
        this.data.official_no = data.row.official_no;
        this.data.hostname = data.row.hostname;
        this.data.photo = data.row.photo;
        this.personal_data = [];
        this.personal_data.push(data.row)
        this.address_data = [];
        let pob_address = data.row.pob_address_book;
        let current_address = data.row.current_address_book;
        this.address_data.push({
          type: 'ទីកន្លែងកំណើត',
          _id: {
            value: pob_address._id,
            label: `${pob_address.province} - ${pob_address.district} - ${pob_address.commune} - ${pob_address.village}`
          },
          province: pob_address.province,
          district: pob_address.district,
          commune: pob_address.commune,
          village: pob_address.village
        })
        this.address_data.push({
          type: 'អាស័យដ្ឋានបច្ចុប្បន្ន',
          _id: {
            value: current_address._id,
            label: `${current_address.province} - ${current_address.district} - ${current_address.commune} - ${current_address.village}`
          },
          province: current_address.province,
          district: current_address.district,
          commune: current_address.commune,
          village: current_address.village
        })
        this.$store.dispatch('family/fetchFamily', data.row._id)
        this.$store.dispatch('education_info/fetchEducationInfo', data.row._id)
        this.$store.dispatch('permission_info/fetchPermissionInfo', data.row._id)
        this.$store.dispatch('position_info/fetchPositionInfo', data.row._id)
        this.$store.dispatch('job_history/fetchJobHistory', data.row._id)
        this.$store.dispatch('job_status/fetchJobStatus', data.row._id)
        this.$store.dispatch('blame_praise/fetchBlamePraise', data.row._id)
      },
      printStaffCV(id) {
        let self = this;
        self.$q.loading.show()
        self.$store.dispatch('report/printStaffCV', id).then(function (data) {
          if (data.status) {
            setTimeout(function () {
              self.$q.loading.hide()
              window.open(data.data.pdf, '_blank')
            }, 2000);
          }
        })
      },
      filterFnAddressBook(val, update, abort) {
        let self = this;
        update(() => {
          const needle = val.toLowerCase()
          self.optionsAddressBook = self.getAddressBooks.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },
      deleteFamily(id) {
        let self = this;
        self.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure to process?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          self.$store.dispatch('family/deleteFamily', id)
        })
      },
      deleteEducationInfo(id) {
        let self = this;
        self.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure to process?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          self.$store.dispatch('education_info/deleteEducationInfo', id)
        })
      },
      deleteBlamePraise(id) {
        let self = this;
        self.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure to process?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          self.$store.dispatch('blame_praise/deleteBlamePraise', id)
        })
      },
      deleteJobHistory(id) {
        let self = this;
        self.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure to process?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          self.$store.dispatch('job_history/deleteJobHistory', id)
        })
      },
      deletePermissionInfo(id) {
        let self = this;
        self.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure to process?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          self.$store.dispatch('permission_info/deletePermissionInfo', id)
        })
      },
      deleteJobStatus(id) {
        let self = this;
        self.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure to process?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          self.$store.dispatch('job_status/deleteJobStatus', id)
        })
      },
      deletePositionInfo(id) {
        let self = this;
        self.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure to process?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          self.$store.dispatch('position_info/deletePositionInfo', id)
        })
      },
      photoFn(value) {
        let self = this;
        self.dataPhoto.set('id', self.data._id);
        self.dataPhoto.set('photo', value);
        let reader = new FileReader();
        reader.readAsDataURL(value);
        reader.onload = function () {
          self.data.photo = reader.result;
          self.data.hostname = '';
        };
        self.updateStaffFile(self.dataPhoto)
      },
      updateStaffFile(data) {
        let self = this;
        data.set('id', self.data._id);
        self.$store.dispatch('staff/updateStaffFile', data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
          } else {
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: data.message
            })
          }
        })
      },
      updateStaff(data) {
        let self = this;
        self.$store.dispatch('staff/updateStaff', data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.address_data = [];
            let pob_address = data.data.pob_address_book;
            let current_address = data.data.current_address_book;
            self.address_data.push({
              type: 'ទីកន្លែងកំណើត',
              _id: {
                value: pob_address._id,
                label: `${pob_address.province} - ${pob_address.district} - ${pob_address.commune} - ${pob_address.village}`
              },
              province: pob_address.province,
              district: pob_address.district,
              commune: pob_address.commune,
              village: pob_address.village
            })
            self.address_data.push({
              type: 'អាស័យដ្ឋានបច្ចុប្បន្ន',
              _id: {
                value: current_address._id,
                label: `${current_address.province} - ${current_address.district} - ${current_address.commune} - ${current_address.village}`
              },
              province: current_address.province,
              district: current_address.district,
              commune: current_address.commune,
              village: current_address.village
            })
          } else {
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: data.message
            })
          }
        })
      },
      filterFnCourse (val, update) {
        let self = this;
        if (val === '') {
          update(() => {
            self.courseOption = self.getCourses
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          self.courseOption = self.getCourses.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      },
      filterFnEducationSystem (val, update) {
        let self = this;
        if (val === '') {
          update(() => {
            self.educationSystemOption = self.getEducationSystems
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          self.educationSystemOption = self.getEducationSystems.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      },
    },
  }
</script>

<style scoped>

</style>
