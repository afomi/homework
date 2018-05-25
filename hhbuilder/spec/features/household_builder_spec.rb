feature "Household Builder", js: true do
  before do
    visit "http://localhost:8000/"
    @age_field = page.find("input[name='age']")
    @relationship_field = page.find("select[name='rel']")
    @add_button = page.find("button.add")
  end

  describe "Member Form" do
    context "form validations" do
      describe "invalid age" do
        before do
          @age_field.set("0")
          @add_button.click
        end

        it "raises an error and does not submit" do
          modal_text = page.driver.browser.switch_to.alert.text
          expect(modal_text).to eq "Please enter an 'Age' of 1 or older"
        end
      end

      describe "invalid relationship" do
        before do
          valid_age = 5
          @age_field.set(valid_age)
          @add_button.click
        end

        it "raises an error and does not submit" do
          modal_text = page.driver.browser.switch_to.alert.text
          expect(modal_text).to eq "Please specify a Relationship"
        end
      end

      describe "valid age and relationship" do
        before do
          @value = (rand(100) + 1).to_s
          @relationship_field.select("Spouse")
          @age_field.set(@value)
          @add_button.click
        end

        it "successfully adds a member" do
          expect(page.find_all(".member").size).to eq(1)
          expect(page.find(".member").text).to include(@value)
        end
      end
    end

    context "Valid form submissions" do
      describe "creating 3 members" do
        before do
          value1 = (rand(100) + 1).to_s
          @relationship_field.select("Spouse")
          @age_field.set(value1)
          @add_button.click

          value2 = (rand(100) + 1).to_s
          @relationship_field.select("Child")
          @age_field.set(value2)
          @add_button.click

          value3 = (rand(100) + 1).to_s
          @relationship_field.select("Grandparent")
          @age_field.set(value3)
          @add_button.click
        end

        it "successfully adds members" do
          expect(page.find_all(".member").size).to eq(3)
        end

        describe "remove last 2 members" do
          before do
            page.find_all(".member").last.find("button.remove").click
            page.find_all(".member").last.find("button.remove").click
          end

          it "successfully removes members" do
            expect(page.find_all(".member").size).to eq(1)
            expect(find(".household").text).to_not include("Spouse")
            expect(find(".household").text).to_not include("Child")
          end
        end
      end
    end
  end
end
